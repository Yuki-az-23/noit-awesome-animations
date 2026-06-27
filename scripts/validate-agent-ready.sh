#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-https://noit2.com}"

ENDPOINTS=(
  "/"
  "/robots.txt"
  "/sitemap.xml"
  "/.well-known/api-catalog"
  "/.well-known/openid-configuration"
  "/.well-known/oauth-authorization-server"
  "/.well-known/oauth-protected-resource"
  "/.well-known/acp.json"
  "/.well-known/mcp/server-card.json"
  "/.well-known/agent-skills/index.json"
  "/openapi.json"
  "/auth.md"
  "/index.md"
  "/healthz"
)

fail_count=0
pass_count=0

check_status_200() {
  path="$1"
  code=$(curl -sS -o /dev/null -w "%{http_code}" "$BASE_URL$path" || true)
  if [ "$code" = "200" ]; then
    echo "PASS status 200: $path"
    pass_count=$((pass_count + 1))
  else
    echo "FAIL status not 200: $path (got $code)"
    fail_count=$((fail_count + 1))
  fi
}

check_content_type_contains() {
  path="$1"
  expected="$2"
  ct=$(curl -sSI "$BASE_URL$path" | tr -d '\r' | grep -i '^content-type:' | head -n 1 | cut -d' ' -f2- || true)
  if echo "$ct" | grep -qi "$expected"; then
    echo "PASS content-type: $path contains $expected"
    pass_count=$((pass_count + 1))
  else
    echo "FAIL content-type: $path expected $expected, got: ${ct:-<none>}"
    fail_count=$((fail_count + 1))
  fi
}

check_header_contains() {
  path="$1"
  header="$2"
  expected="$3"
  value=$(curl -sSI "$BASE_URL$path" | tr -d '\r' | grep -i "^$header:" || true)
  if echo "$value" | grep -qi "$expected"; then
    echo "PASS header: $path has $header containing $expected"
    pass_count=$((pass_count + 1))
  else
    echo "FAIL header: $path missing $header containing $expected"
    fail_count=$((fail_count + 1))
  fi
}

echo "Validating agent-readiness for: $BASE_URL"
echo

for path in "${ENDPOINTS[@]}"; do
  check_status_200 "$path"
done

echo
check_content_type_contains "/robots.txt" "text/plain"
check_content_type_contains "/.well-known/api-catalog" "application/linkset+json"
check_content_type_contains "/.well-known/agent-skills/index.json" "application/json"
check_content_type_contains "/auth.md" "text/markdown"
check_content_type_contains "/index.md" "text/markdown"

echo
check_header_contains "/" "Link" "api-catalog"
check_header_contains "/" "Link" "service-doc"
check_header_contains "/" "Vary" "Accept"

echo
robots_body=$(curl -sS "$BASE_URL/robots.txt" || true)
if echo "$robots_body" | grep -q "User-agent: GPTBot" && \
   echo "$robots_body" | grep -q "User-agent: Claude-Web" && \
   echo "$robots_body" | grep -q "User-agent: Google-Extended" && \
   echo "$robots_body" | grep -q "Content-Signal:"; then
  echo "PASS robots directives: AI user-agents and Content-Signal found"
  pass_count=$((pass_count + 1))
else
  echo "FAIL robots directives: missing expected AI user-agents or Content-Signal"
  fail_count=$((fail_count + 1))
fi

echo
markdown_ct=$(curl -sSI -H "Accept: text/markdown" "$BASE_URL/" | tr -d '\r' | grep -i '^content-type:' | head -n 1 | cut -d' ' -f2- || true)
if echo "$markdown_ct" | grep -qi "text/markdown"; then
  echo "PASS markdown negotiation: homepage returns text/markdown"
  pass_count=$((pass_count + 1))
else
  echo "WARN markdown negotiation: homepage did not return text/markdown (got: ${markdown_ct:-<none>})"
fi

echo
printf 'Summary: %s pass, %s fail\n' "$pass_count" "$fail_count"
if [ "$fail_count" -gt 0 ]; then
  exit 1
fi
