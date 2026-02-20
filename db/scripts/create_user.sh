#!/bin/bash
readonly PASSWORD=${1:-"password"}

use admin;
db.createUser({
  user: "oca",
  pwd: "$PASSWORD",
  roles: [{ role: "root", db: "admin" }]
});

mongosh -u oca -p "$PASSWORD" --authenticationDatabase admin