import { MultiPolygon, Point, Polygon } from "geojson";
import { WellKnownType } from "../../src/datatypes/well-known-type";

describe("WellKnownType", () => {
  it("should throw on null geometry", () => {
    // @ts-ignore TS2345
    const createFunc = () => new WellKnownType(null);
    expect(createFunc).toThrow();
  });

  it("should create WKT for point", () => {
    const point: Point = {
      type: "Point",
      coordinates: [-68.980986, 12.198599],
    };

    const wkt = new WellKnownType(point);
    expect(wkt.toString()).toEqual("POINT (-68.980986 12.198599)");
  });

  it("should create WKT for polygon", () => {
    const polygon: Polygon = {
      type: "Polygon",
      coordinates: [
        [
          [-113.599831726514, 53.458273089013],
          [-113.600049996812, 53.45827360864],
          [-113.600052949158, 53.457932503403],
          [-113.599845224387, 53.457931995732],
          [-113.599834691275, 53.457931970341],
          [-113.599831726514, 53.458273089013],
        ],
      ],
    };

    const wkt = new WellKnownType(polygon);
    expect(wkt.toString()).toEqual(
      "POLYGON ((-113.599831726514 53.458273089013, -113.600049996812 53.45827360864, -113.600052949158 53.457932503403, -113.599845224387 53.457931995732, -113.599834691275 53.457931970341, -113.599831726514 53.458273089013))"
    );
  });

  it("should create wkt for multipolygon", () => {
    const multipolygon: MultiPolygon = {
      type: "MultiPolygon",
      coordinates: [
        [
          [
            [-113.433545160163, 53.438326588767],
            [-113.433526725247, 53.438293500447],
            [-113.43349973004, 53.438262578539],
            [-113.433483067917, 53.438243526968],
            [-113.433471604889, 53.438223153919],
            [-113.433465623247, 53.438201959466],
            [-113.433465269509, 53.438180468201],
            [-113.433006245908, 53.438161453863],
            [-113.433005693887, 53.438325807864],
            [-113.433545160163, 53.438326588767],
          ],
        ],
      ],
    };

    const wkt = new WellKnownType(multipolygon);
    expect(wkt.toString()).toEqual(
      "MULTIPOLYGON (((-113.433545160163 53.438326588767, -113.433526725247 53.438293500447, -113.43349973004 53.438262578539, -113.433483067917 53.438243526968, -113.433471604889 53.438223153919, -113.433465623247 53.438201959466, -113.433465269509 53.438180468201, -113.433006245908 53.438161453863, -113.433005693887 53.438325807864, -113.433545160163 53.438326588767)))"
    );
  });
});
