FROM golang:1.21.1 AS build-stage

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o api


FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=build-stage /app/api api

RUN chmod +x api

EXPOSE 3000

ENTRYPOINT ["./api"]