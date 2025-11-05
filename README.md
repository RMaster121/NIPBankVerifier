# NIP Bank Verifier

> **[🇵🇱 Wersja polska / Polish version](README-PL.md)** | **🇬🇧 English version** (current)

A web application for verifying Polish company bank accounts using the official Ministry of Finance (MF.GOV.PL) White List API. This tool allows you to validate whether a given bank account number is registered to a specific company identified by NIP or REGON number.

## 🌟 Features

- **Single & Batch Verification**: Verify one or multiple entities at once
- **Excel Import/Export**: Import verification data from Excel spreadsheets and export results
- **PDF Reports**: Generate detailed PDF reports for each verification
- **Real-time Validation**: Instant validation of NIP, REGON, and bank account numbers
- **Official Data Source**: Uses the official Polish Ministry of Finance API
- **Template Support**: Download Excel templates for easy bulk operations
- **Responsive Design**: Modern, mobile-friendly interface built with TailwindCSS

## 🚀 Getting Started

### Prerequisites

- Node.js (version specified in [`.nvmrc`](.nvmrc))
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RMaster121/NIPBankVerifier
cd NIPBankVerifier
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Single Verification

1. Enter a NIP or REGON number in the first field
2. Enter the bank account number (26 digits) in the second field
3. Click "Zweryfikuj" (Verify)
4. View the results with company details and account verification status

### Bulk Verification

1. Click "Importuj z Excela" (Import from Excel)
2. Either:
   - Download the template and fill it with your data, then upload it
   - Paste data directly from Excel in the text area
3. Click "Importuj" (Import)
4. Click "Zweryfikuj" (Verify) to process all entries
5. Export results to Excel using the export button

### PDF Reports

For each verification result, you can generate a detailed PDF report containing:
- Search parameters (NIP/REGON and bank account)
- Verification status
- Company details (name, address, NIP, REGON)
- All registered bank accounts (searched account highlighted)

## 🛠️ Built With

- **[SvelteKit](https://kit.svelte.dev/)** - Web application framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation
- **[XLSX](https://github.com/SheetJS/sheetjs)** - Excel file handling
- **[Svelte French Toast](https://svelte-french-toast.com/)** - Toast notifications

## 📋 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn test` - Run all tests (unit + integration)
- `yarn test:unit` - Run unit tests
- `yarn test:integration` - Run Playwright integration tests
- `yarn check` - Run Svelte type checking
- `yarn lint` - Lint code
- `yarn format` - Format code with Prettier

## 🧪 Testing

The project includes:
- **Unit Tests**: Using Vitest for utility functions
- **Integration Tests**: Using Playwright for E2E testing

Run tests with:
```bash
yarn test
```

## 🏗️ Project Structure

```
NIPBankVerifier/
├── src/
│   ├── lib/
│   │   ├── components/     # Svelte components
│   │   ├── models/         # TypeScript type definitions
│   │   └── utilities/      # Helper functions
│   ├── routes/             # SvelteKit routes
│   └── app.html            # HTML template
├── static/                 # Static assets
├── tests/                  # Test files
└── ...config files
```

## 🌐 API Reference

This application uses the official Polish Ministry of Finance White List API:

**Endpoint**: `https://wl-api.mf.gov.pl/api/search/{type}/{value}?date={date}`

Where:
- `{type}`: Either `nip` or `regon`
- `{value}`: The NIP or REGON number
- `{date}`: Date in YYYY-MM-DD format

**Note**: No API key required - this is a public API provided by the Polish government.

## 📝 Input Validation

- **NIP**: 10-digit number
- **REGON**: 9 or 14-digit number
- **Bank Account**: 26-digit number (Polish IBAN without country code)

All inputs automatically strip spaces, dashes, and underscores.

## 🚢 Deployment

The application is configured for Cloudflare Pages deployment using [`@sveltejs/adapter-cloudflare`](https://kit.svelte.dev/docs/adapter-cloudflare).

To deploy:
```bash
yarn build
```

The build output will be in the `.svelte-kit/cloudflare` directory.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## 👤 Author

Rafał Szczerba (rs.szczerba@hotmail.com)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⚠️ Disclaimer

This application uses publicly available data from the Polish Ministry of Finance. Always verify critical information through official channels. The accuracy of the data depends on the official API and its update frequency.

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Note**: This is an unofficial tool and is not affiliated with or endorsed by the Polish Ministry of Finance.
