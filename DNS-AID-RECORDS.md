# DNS-AID Records for noit2.com

DNS-AID is configured in DNS, not in static site files.

Publish records similar to the following in your DNS provider:

- _index._agents.noit2.com. IN HTTPS 1 . alpn="h2" endpoint="noit2.com/.well-known/agent-skills/index.json"
- _a2a._agents.noit2.com. IN HTTPS 1 . alpn="h2" endpoint="noit2.com/.well-known/api-catalog"

If your provider supports SVCB directly, you can use SVCB instead of HTTPS with equivalent parameters.

Enable DNSSEC for the zone so validating resolvers can authenticate discovery data.

References:
- draft-mozleywilliams-dnsop-dnsaid
- RFC 9460
