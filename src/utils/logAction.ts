export const logAction = <T>(action: string, method: () => T): T => {
    console.log(action);

    return method()
}
