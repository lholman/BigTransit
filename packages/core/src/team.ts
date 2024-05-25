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

export function fromID(_teamID: number) {
    return {
        teamID: 1,
        name: "Retention Team" 
    } as Info
}

export function list() {
    return undefined as Info[];
}