# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| `main` | Yes |

Feature branches are considered short-lived delivery branches and should be merged or closed promptly.

## Reporting a Vulnerability

Please do not report unpatched security issues in a public issue.

If private vulnerability reporting is enabled, use GitHub's **Report a vulnerability** flow. Otherwise, contact the repository owner privately and include:

- a concise description of the issue
- affected endpoints, workflows, or database objects
- reproduction steps
- severity and likely impact
- suggested remediation if known

## Security Baseline

This repository is intended to follow a lightweight secure-by-default baseline:

- pull requests for changes to `main`
- automated CI for build and test validation
- dependency update automation through Dependabot
- CodeQL analysis for application code
- no committed secrets or live environment values
