import { GameManager } from "./store";

export function startLogger() {
    setInterval(() => {
        GameManager.getInstance().log();
    }, 2000)
}
