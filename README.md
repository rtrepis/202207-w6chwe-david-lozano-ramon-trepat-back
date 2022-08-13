[URL] https://r202207-w6chwe-davi-ramu-back.herokuapp.com

[GET] /robots -> devuelve un array con todos los robots de la BD

[GET] /robots/:idRobot -> devuelve un robot de la BD por id

[POST*] /robots/create -> recibe un robot (sin id), lo crea en la BD y devuelve el robot recién creado

[PUT*] /robots/update -> recibe un robot, modifica en la BD el robot con la misma id que el recibido, y devuelve el robot modificado

[DELETE*] /robots/delete/:idRobot -> elimina de la BD un robot por id y devuelve un objeto con la id

Recuerda que cada response debe ir con un código de status adecuado y que todos los body de las responses tienen que ser objetos en JSON.

- Las request con POST, PUT y DELETE estarán protegidas con un token, que debe pasarse por query param. P.e.: /robots/create?token=h29D8b23Llm45
