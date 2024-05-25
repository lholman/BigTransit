export * as Team from "./team"

export interface Info {
    teamID: number;
    name: string;
}

export function newTeamWithName(_name: string) {
    return {
        teamID: 1,
        name: _name 
    } as Info
}

export function fromID(_teamID: string) {
    return undefined as Info[];
}

export function list() {
    return undefined as Info[];
}