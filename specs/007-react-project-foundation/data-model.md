# Data Model: React Project Foundation

The foundation adds no domain entities, backend records, authentication state, payment data, or persistent browser storage.

- **Public configuration**: `VITE_CONTACTS_API_BASE_URL` is a build-time public string used by the demo contact integration. It is not a credential and must not contain private data.
- **Browser support policy**: A build-time tool configuration derived from `.browserslistrc`; it is not runtime application state.
- **Routes**: Owned by feature specifications and represented by the selected React Router. This foundation establishes the router integration point but does not own route-specific page data.
