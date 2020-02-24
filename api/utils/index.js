import assert from 'assert';

export const encodeGlobalID = (typeName, id) =>
  id ? Buffer.from(`${typeName}:${id}`).toString('base64') : undefined;

const decodeID = (globalID) => {
  if (!globalID) {
    throw new Error(`globalID can't decode`);
  }
  const decoded = Buffer.from(globalID, 'base64').toString('utf-8');
  const splitIds = decoded.split(':');

  assert.equal(
    splitIds.length,
    2,
    `Cannot decode ID ${globalID}. It is not valid.`,
  );

  return splitIds;
};

export const decodeGlobalID = (typeName, globalID) => {
  const [internalTypeName, internalID] = decodeID(globalID);

  if (typeName) {
    assert.equal(
      internalTypeName,
      typeName,
      `Expected Id "${globalID}" to be type ${typeName}, but was ${internalTypeName}.`,
    );
  }

  return internalID;
};

export const decodeType = (globalID) => {
  const decodedTypeName = decodeID(globalID)[0];

  return decodedTypeName;
};
