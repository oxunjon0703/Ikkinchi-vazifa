const fs = require('fs').promises;

class Io {
    constructor(dir) {
        this.dir = dir;
    };

    async read() {
        const data = await fs.readFile(this.dir, {encoding: 'utf8'});

        return data ? JSON.parse(data) : [];
    };

    async write(data) {
        await fs.writeFile(this.dir, JSON.stringify(data, null, 2), {encoding: 'utf8'});
    };
};

module.exports = Io;