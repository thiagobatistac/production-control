# Production Control System

## English

### Description
Production Control System is a full stack application for managing products, raw materials, product compositions and production suggestions based on available stock.

### Features
- Product CRUD
- Raw materials CRUD
- Product composition association
- Production suggestion with quantity and total value calculation
- Layered REST API (Controller, Service, Repository, DTO)
- Automated tests (Controller, Service, Repository)
- React frontend with Redux Toolkit

### Technologies

#### Backend
- Java 21
- Spring Boot (Web, JPA)
- MySQL (production) / H2 (tests)
- JUnit 5, Mockito
- Maven

#### Frontend
- React
- Redux Toolkit
- React Router
- Axios

### Project Structure
```text
production-control/
├── backend/
│   ├── src/main/java    ← Backend source
│   ├── src/test/java    ← Automated tests
│   └── pom.xml          ← Maven configuration
└── frontend/
    ├── src              ← Frontend source
    └── package.json
```

### Automated Tests
The backend includes tests for:
- JPA repositories
- Business logic in Services
- REST endpoints using MockMvc

The H2 in-memory database is used during test execution.

#### Run tests:
```bash
cd backend
mvn clean test
```

### Running the Backend
```bash
cd backend
mvn spring-boot:run
```

### Running the Frontend
```bash
cd frontend
npm install
npm start
```

---

## Português

### Descrição
Production Control System é uma aplicação full stack para gerenciamento de produtos, matérias-primas, composições de produto e sugestões de produção com base no estoque disponível.

### Funcionalidades
- CRUD de produtos
- CRUD de matérias-primas
- Associação de matérias-primas a produtos (composições)
- Sugestões de produção com cálculo de quantidade possível e valor total
- API REST estruturada com camadas Controller, Service, Repository e DTO
- Testes automatizados (Controller, Service e Repository)
- Frontend React com Redux Toolkit

### Tecnologias

#### Backend
- Java 21
- Spring Boot (Web, JPA)
- MySQL (produção) / H2 (testes)
- JUnit 5, Mockito
- Maven

#### Frontend
- React
- Redux Toolkit
- React Router
- Axios

### Estrutura do Projeto
```text
production-control/
├── backend/
│   ├── src/main/java    ← Código backend
│   ├── src/test/java    ← Testes automatizados
│   └── pom.xml          ← Configuração Maven
└── frontend/
    ├── src              ← Código frontend
    └── package.json
```

### Testes Automatizados
O backend possui testes para:
- Repositórios JPA
- Lógica de negócio em Services
- Endpoints REST com MockMvc

O banco H2 é utilizado para execução de testes.

#### Executar testes:
```bash
cd backend
mvn clean test
```

### Executando o Backend
```bash
cd backend
mvn spring-boot:run
```

### Executando o Frontend
```bash
cd frontend
npm install
npm start
```
