import map from './init-map';

function getMapBounds() {
  const boundsWest = map.getBounds().getWest();
  const boundsWestFloor = Math.floor(boundsWest);
  const boundsSouth = map.getBounds().getSouth();
  const boundsSouthFloor = Math.floor(boundsSouth);
  const boundsEast = map.getBounds().getEast();
  const boundsEastFloor = Math.floor(boundsEast);
  const boundsNorth = map.getBounds().getNorth();
  const boundsNorthFloor = Math.floor(boundsNorth);
  const boundsArr = [boundsWestFloor, boundsSouthFloor, boundsEastFloor, boundsNorthFloor];
  const boundsString = boundsArr.join(',');
  return boundsString;
}

export default getMapBounds;
