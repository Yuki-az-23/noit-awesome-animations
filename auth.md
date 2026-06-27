# Auth.md for Noit2

This document describes how AI agents can register and authenticate.

## Registration

- Register URI: https://noit2.com/agent/register
- Identity types: did:web, dns
- Credential types: oauth-client-attestation, jwt

## Token Discovery

- OAuth server metadata: /.well-known/oauth-authorization-server
- Protected resource metadata: /.well-known/oauth-protected-resource
- OIDC metadata: /.well-known/openid-configuration

## Claims and Revocation

- Claims URI: https://noit2.com/agent/claims
- Revocation URI: https://noit2.com/agent/revoke

## Contact

Website: https://noit2.com/
