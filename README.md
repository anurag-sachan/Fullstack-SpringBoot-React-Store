# Fullstack-SpringBoot-React-Store

## How to Run

- Clone the repository.
  
  ```shell
  git clone https://github.com/anurag-sachan/Fullstack-SpringBoot-React-Store.git
  ```

- Setup a postgres instance and update the configuration file [**here**](backend/src/main/resources/application.properties).
  
    > If you are unsure about the postgres setup, you can always use docker. It's extremely simple. <br/>
    > Go to Fullstack-SpringBoot-React-Store folder. Run the command below :

    ```shell
    # This will create a postgres container named `mydb`
    # This will also create mount(pgdata) between docker & PC for data sharing.
    
    docker run --rm --name mydb -v $(pwd)/pgdata:/var/lib/postgresql/data -d -p 5432:5432 -e POSTGRES_USER=anurag -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=productdb postgres
    ```
    
- Run the Backend:
  
  ```shell
  # This will auto initialize the required relations schema into the current database.
  
  ./mvnw spring-boot:run
  ```

- [Optional]: If you want to insert dummy data into the postgres db run the below command from your terminal:

  ```shell
  cp dummy-data.csv pgdata
  ```
  ```shell
  docker exec -it mydb psql -h 127.0.0.1 -d productdb -p 5432 -U anurag
  ```
  ```shell
  \copy product FROM '/var/lib/postgresql/data/dummy-data.csv' DELIMITER '$' CSV HEADER;
  ```

- Run the frontend:

  ```shell
  npm i && npm start
  ```
  
If you are using the application in localhost, please enable the option that says "Allow invalid certificates for resources loaded from localhost" due to the certificate [file](backend/src/main/resources/https.p12) being a self signed certificate and the backend being `HTTPS Ready`.

## Screenshots
- Please refer to the working demo-images from [**here**](demo-jpg).

<br/>
Thanks,

Anurag.
