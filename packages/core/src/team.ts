export * as Team from "./team"

interface Team {
    teamID: string;
    name: string;
}

interface Item {
    PK: string;
    SK: string;
    Name: string;
    createdAt: string;
    updatedAt: string;
}

export function newTeamWithName(_name: string) {
    
    return {
        teamID: "1",
        name: _name 
    } as Team
}

export function fromID(_teamID: number) {
    return {
        teamID: "1",
        name: "Retention Team" 
    } as Team
}

export function list() {
    return undefined as Info[];
}