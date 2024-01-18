FROM openjdk:11 as build
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:resolve
COPY src ./src
RUN ./mvnw package

FROM eclipse-temurin:17-jre-jammy
COPY --from=build /app/target/shop-app-0.0.1-SNAPSHOT.jar /shop-app.jar
ENTRYPOINT ["java","-jar","shop-app.jar"]
EXPOSE 8080