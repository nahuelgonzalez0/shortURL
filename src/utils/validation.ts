export function validarURL(url:string) {
    const urlRegex = new RegExp(/^(http|https):\/\/[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(\/[^\s]*)?$/);
    return urlRegex.test(url)
}