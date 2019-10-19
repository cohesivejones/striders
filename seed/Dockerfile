FROM mongo

COPY data.json /data.json
CMD mongoimport --host sponsors_db --db app --collection sponsors --type json --file /data.json --jsonArray
