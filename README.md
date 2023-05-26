¿Qué sucedió al usar async y await?
Al usar async y await, las funciones addTask(), deleteTask() y completeTask() devuelven promesas que se resuelven con el respectivo mensaje de éxito o se rechazan con un mensaje de error. La función displayMenu() usa async/await para esperar a que las promesas se resuelvan o rechacen. Esto me permitió escribir código asincrónico en un estilo sincrónico, lo que facilito su lectura y comprensión. El programa se detiene en cada declaración de espera hasta que se resuelve la promesa y luego continúa ejecutándose.

¿Qué sucedió al usar el método then()?
Cuando use el método then(), adjunte una devolución de llamada then() a cada promesa devuelta por las funciones addTask(), deleteTask() y completeTask(). La devolución de llamada then() se ejecutó cuando se resolvió la promesa, y pude acceder al valor resuelto (mensaje de éxito) dentro de la devolución de llamada. Si hay un error (rechazo de promesa), puedo manejarlo usando el método catch(). El programa continúa ejecutándose mientras se resuelven o rechazan las promesas, y las devoluciones de llamada de then() se llaman de forma asincrónica.

Diferencias encontradas entre async, await y el método then():

Async/await: Pude escribir código asíncrono en un estilo síncrono, lo que facilita su comprensión y lectura. El código fluye de una manera más lineal y puedo usar variables para capturar los valores resueltos directamente. También me permite manejar errores usando bloques try/catch, haciendo que el manejo de errores sea más sencillo.

Método then(): El método then() me permitió encadenar devoluciones de llamada a promesas y proporciona una forma de manejar operaciones asincrónicas. Tuve que adjuntar múltiples devoluciones de llamada de then() para manejar cada paso en la cadena de promesa. El método then() es útil cuando se tienen varias operaciones asincrónicas que deben ejecutarse secuencialmente o cuando se desea manejar el valor resuelto y los errores por separado.

En general, async/await proporciona un estilo más conciso y síncrono de escribir código asíncrono, mientras que el método then() permite una mayor flexibilidad en el manejo de promesas y el encadenamiento de varias operaciones asíncronas.
