interface Pipeline {
    pipelineID: string;
    name: string;
}

function create(name: string) {
    return undefined as unknown as Pipeline;
}

function fromID(_pipeline: Pipeline) {
    return undefined as unknown as Pipeline;
}