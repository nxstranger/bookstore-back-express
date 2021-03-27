#!/bin/sh

echo "entrypoint"


if [ "$DB_DIALECT" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOSTNAME $DB_PORT; do
      sleep 0.2
    done

    echo "PostgreSQL started"
fi


sleep 1
yarn sequelize db:migrate
echo "db:migrate"
sleep 1
yarn sequelize db:seed:all
echo "db:seed:all"
sleep 1

exec "$@"
