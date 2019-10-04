FROM mongo

COPY data.json /data.json
CMD mongoimport --host sponsers_db --db app --collection sponsers --type json --file /data.json --jsonArray
