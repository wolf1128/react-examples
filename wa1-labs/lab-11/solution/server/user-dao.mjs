import db from "./db.mjs";
import crypto from "crypto";

export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    // const sql = "SELECT * FROM user WHERE email = ?"; // xxx wrong solution provided!
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: row.id, username: row.email, name: row.name };

        crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
          if (err) reject(err);
          if (
            !crypto.timingSafeEqual(
              Buffer.from(row.hash, "hex"), // NOTE: In this db (in contrast to db of the class which used row.password, used row.hash
              hashedPassword
            )
          )
            resolve(false);
          else resolve(user);
        });
      }
    });
  });
};

export const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE id = ?";
    db.get(sql, [id], (err, row) => {
      if (err) reject(err);
      else if (row === undefined) reject(false);
      else resolve({ id: row.id, email: row.email, name: row.name });
    });
  });
};
