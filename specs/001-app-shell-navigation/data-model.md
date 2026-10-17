# Data Model: App Shell and Navigation

This feature introduces no persistent or domain data model.

- **Current route**: Owned by the router selected through specification 007. The shell derives the active navigation area from the current location; it does not maintain a duplicate route value.
- **Mobile menu visibility**: Ephemeral presentation state for the collapsible navigation. It is not persisted.
- **Cart count**: Supplied by the shopping-cart feature. The shell displays the provided value and does not calculate or store it.
- **Route parameters**: Contact and product identifiers are interpreted by their respective feature destinations, not by the shared shell.
