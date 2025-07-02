# Document Management SPA

This project is a Single Page Application (SPA) for document management, built using React 18, Vite, TypeScript, and Material UI v5. It demonstrates the principles of hexagonal architecture (ports & adapters) to achieve modular, decoupled, and maintainable interfaces. All relevant information is persisted in the browser's `localStorage`.

## Project Structure and Technical Decisions

The project adheres to the hexagonal architecture (Ports & Adapters) to ensure a clear separation of concerns and maintainability.

*   **`src/domain`**: This layer contains the core business logic and entities, completely independent of any external frameworks or persistence mechanisms.
    *   `models/`: Defines the core data structures like `Document.ts` and `DocumentType.ts`.
    *   `repositories/`: Defines interfaces (ports) for data persistence, such as `DocumentRepository.ts` and `DocumentTypeRepository.ts`. These are contracts that infrastructure adapters must implement.

*   **`src/application`**: This layer contains the application-specific business rules and use cases. It orchestrates interactions between the domain and infrastructure layers.
    *   `Use-cases/Document/`: Contains functions that represent specific actions or operations on documents (e.g., `createDocument.ts`, `updateDocument.ts`, `deleteDocument.ts`). These use cases depend on the domain repositories (ports).

*   **`src/infrastructure`**: This layer contains the implementation details (adapters) that connect the application to external concerns like UI, persistence, and external services.
    *   `persistence/local-storage/`: Implements the `DocumentRepository` and `DocumentTypeRepository` interfaces using `localStorage` as the persistence mechanism (`LocalStorageDocumentRepository.ts`, `LocalStorageDocumentTypeRepository.ts`). These are adapters for the persistence port.
    *   `ui/`: Contains the user interface components and pages.
        *   `components/`: Reusable UI components like `DocumentForm.tsx` and `DocumentList.tsx`.
        *   `hooks/`: Custom React hooks that act as adapters, exposing application use cases to the UI (e.g., `useDocuments.ts`, `useDocumentTypes.ts`).
        *   `pages/`: Top-level components representing different views of the application (e.g., `Homepage.tsx`, `DocumentTypeManagementPage.tsx`).
        *   `App.tsx`: Main application component, setting up routing and global layout.
        *   `main.tsx`: Entry point for the React application.

**Key Decisions:**
*   **Hexagonal Architecture**: Enforces a clear separation between business logic (domain, application) and external concerns (infrastructure). This makes the application more testable, maintainable, and adaptable to changes in technology (e.g., switching from `localStorage` to a backend API would only require changing the persistence adapter).
*   **TypeScript**: Provides static typing for improved code quality, readability, and maintainability.
*   **Material UI v5**: Used for a consistent and modern UI, accelerating development with pre-built components.
*   **React Router DOM v6**: Manages client-side routing for a seamless SPA experience.
*   **LocalStorage for Persistence**: Meets the requirement for local data persistence, demonstrating the adapter pattern for data storage.
*   **UUID for IDs**: Ensures unique identifiers for documents and document types.
*   **Soft Delete**: Documents are marked as 'deleted' rather than physically removed, allowing for recovery or auditing.

## Stack Tecnológico

| Herramienta       | Versión | Rol                               |
| :---------------- | :------ | :-------------------------------- |
| React             | ^18.x   | Biblioteca UI                     |
| Vite              | ^5.x    | Bundler y servidor local          |
| TypeScript        | ^5.x    | Tipado estático                   |
| Material UI       | ^5.x    | Componentes visuales              |
| React Router DOM  | ^6.x    | Ruteo SPA                         |
| Axios / Fetch     | -       | (Not explicitly used, localStorage for persistence) |
| LocalStorage      | -       | Persistencia local (ej. preferencias) |
| uuid              | ^9.x    | Generación de IDs únicos          |

## Installation and Execution Instructions

To get the project up and running on your local machine:

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd prueva
    ```
    *(Note: The project files are located in the `prueva` subdirectory after cloning.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, usually at `http://localhost:5173/` or a similar port. Open this URL in your browser to access the application.

## Functional Requirements Implemented

*   **Carga de documentos (Document Upload)**:
    *   Users can upload new documents with metadata: name, document type, creation date, attached file (PDF or image), and description.
    *   Mandatory validations and allowed extensions (.pdf, .jpg, .png) are enforced.
    *   File content is simulated as Base64 strings for local storage.
*   **Listado de documentos (Document Listing)**:
    *   Documents are displayed in a table with columns: Name, Type, Date, Status, and Actions.
    *   Supports filtering by name, type, and date range.
*   **Visualización de documento (Document Viewing)**:
    *   Clicking on a document shows a modal with metadata and a simulated view of the document (PDF embed, image display, or download link for other types).
*   **Edición de documentos (Document Editing)**:
    *   Users can modify document metadata (file cannot be changed).
    *   A form with pre-loaded values and validation is provided.
*   **Eliminación lógica (Soft Delete)**:
    *   Documents are marked with a "deleted" status instead of being physically removed.
*   **Persistencia en localStorage**:
    *   All changes (create, edit, delete) are reflected in `localStorage` as the source of truth.
*   **Gestión de Tipos de Documento (Document Type Management)**:
    *   Document types can be created, edited, and deleted.
    *   This configuration is also saved in `localStorage`.
