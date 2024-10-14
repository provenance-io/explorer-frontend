import {getSigningProvenanceClientOptions as getSigningProvenanceJSClientOptions } from "@provlabs/provenancejs";

export const getSigningProvenanceClientOptions = {
  registry: getSigningProvenanceJSClientOptions().registry,
  aminoTypes: [],
};