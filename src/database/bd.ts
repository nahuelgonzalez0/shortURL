//la bd en si
import connect from './database'

export async function createUrls (idUsuario: string,shortUrl: string, longUrl: string, titulo: string | undefined, descripcion: string | undefined, imagen: string | undefined) {
const db = await connect()
    if (db !== null) {
        const urlTable = `
            CREATE TABLE IF NOT EXISTS urls (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                IdUsuario TEXT NOT NULL,
                shortUrl TEXT NOT NULL,
                longUrl TEXT NOT NULL,
                titulo TEXT,
                descripcion TEXT,
                imagen TEXT
            )
        `
        const insertUrl = `
        INSERT INTO urls (IdUsuario, shortUrl, longUrl, titulo, descripcion, imagen)
        VALUES (?, ?, ?, ?, ?, ?)
        `
        try {
            await db.exec(urlTable)
            const result = await db.run(insertUrl, [idUsuario, shortUrl, longUrl, titulo, descripcion, imagen])
            console.log("URL creada con exito")
            return {
                id: result.lastID,
                idUsuario,
                shortUrl,
                longUrl,
                titulo,
                descripcion,
                imagen
            }
        } catch (error) {
            console.log("Error al crear la URL:", error)
        }
    }
}

export async function getLongUrl(shortUrl: string) {
    const db = await connect();
    if (db !== null) {
        const selectUrl = `
            SELECT longUrl FROM urls
            WHERE shortUrl = ?
        `;
        try {
            const result = await db.get(selectUrl, [shortUrl]);
            // Verificamos si result es null, lo que indica que no se encontró la URL
            if (result) {
                return result.longUrl; // Devolvemos la URL larga
            } else {
                console.log("URL no encontrada.");
                return null; // O algún valor indicativo
            }
        } catch (error) {
            console.log("Error al obtener la URL:", error);
            return null; // En caso de error, devolvemos null
        }
    } else {
        console.log("Error: no se pudo conectar a la base de datos.");
        return null;
    }
}

//modificarla para que seleccione solo las url por Id de usuario
export async function getUrls (IdUsuario: string) {
    const db = await connect()
    if (db !== null) {
        const selectUrls = `
            SELECT * FROM urls
            WHERE IdUsuario = ?`
            try {
                const result = await db.all(selectUrls, [IdUsuario])
                return result
            } catch (error) {
                
            }
    }
}

export async function borrarbd () {
    const db = await connect()
    if (db !== null) {
        const borrarTabla = `
            DROP TABLE IF EXISTS urls
        `
        try {
            await db.exec(borrarTabla)
            console.log("Tabla borrada con exito")
        } catch (error) {
            console.log("Error al borrar la tabla:", error)
        }
    }
}

