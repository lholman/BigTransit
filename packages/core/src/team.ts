export * as Team from "./team"

interface Team {
    teamID: string;
    name: string;
}

export function create(name: string) {
    return undefined as Team;
}

export function fromID(_teamID: string) {
    return "Stream Aligned Team 1"
}

export function list() {
    return undefined as Team[];
}