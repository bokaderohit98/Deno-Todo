## Minimal TODO API Implementation using Deno

This project uses DENO runtime along with OAK package to implement APIs. DENON is used for providing auto restart capability to the server in development.

The Todo Data is stored in the json file.

### API Endpoints

| Method | Endpoint                   | Use                                         | Body | Query                     |
| ------ | -------------------------- | ------------------------------------------- | ---- | ------------------------- |
| GET    | /todos                     | Lists all todos                             |      | ?completed = <true\false> |
| GET    | /todos/id                  | Returns todo with the given ID              |      |
| POST   | /todos                     | Adds a new todo                             | text |
| DELETE | /todos/:id                 | Deletes todo with the give ID               |      |
| PUT    | /todos/:id/toggle-complete | Toggles the completed attribute of the todo |      |
| PUT    | /todos/:id/update          | Updates todo's text                         | text |

### How to get started?

-   Clone the repository, navigate to root directory and run

    ```
    deno --allow-read --alow-write --allow-env --allow-net app.ts
    ```

    Note: We are listing permissions here. This is one of the strength of Deno.

    ### OR

-   Install Denon and make use of denon.json config to save time. As before clone the repository, navigate to root directory and run
    ```
    denon start
    ```
