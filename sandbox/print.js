import { readFile } from 'fs/promises';

(async () => {
    const json = JSON.parse(
        await readFile(
            new URL('./warframeWorldSate.json', import.meta.url)
        )
    );
    console.log(json);
})()