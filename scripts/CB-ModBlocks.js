const distributionBox = extend(MassDriver, "distribution-box", {
  
    changePlacementPath(points, rotation){
        Placement.calculateNodes(points, this, rotation, (point, other) =>
            point.dst2(other) <= 36
        );
    }
  
});
