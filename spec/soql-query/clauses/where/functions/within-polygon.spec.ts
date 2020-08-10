import { Column } from "../../../../../src/soql-query/clauses/column";
import { WithinPolygon } from "../../../../../src/soql-query/clauses/where/functions/within-polygon";
import { GeoJSONUtils } from "../../../../../src/utilities/geojson-utils";
import { WhereValue } from '../../../../../src/soql-query/clauses/where/where-value';

describe("WithinPolygon Where Filter", () => {
  
  const multipolygon = new WhereValue(GeoJSONUtils.multipolygon(
  [
    [
      -113.492068121648,
      53.55784419845
    ],
    [
      -113.492503551661,
      53.557778292305
    ],
    [
      -113.492467250002,
      53.557691409088
    ],
    [
      -113.492031508924,
      53.557756391816
    ],
    [
      -113.492068121648,
      53.55784419845
    ]
  ],
  [
    [
      -113.536966729027,
      53.618692548203
    ],
    [
      -113.537518089256,
      53.61867322157
    ],
    [
      -113.537502080295,
      53.618514703566
    ],
    [
      -113.536950735933,
      53.618534011314
    ],
    [
      -113.536966729027,
      53.618692548203
    ]
  ]
));

  it("should throw on null column", () => {
    const createFunc = () => new WithinPolygon(
      null,
      multipolygon
    );
    expect(createFunc).toThrow();
  });

  it("should throw on null polygon", () => {
    const createFunc = () => new WithinPolygon(
      new Column("col1"),
      null
    );
    expect(createFunc).toThrow();
  });

  it("should create within_polygon where filter for multipolygon", () => {
    

    const filterObj = new WithinPolygon(
      new Column("col1"),
      multipolygon
    );
    expect(filterObj.toString())
      .toEqual("within_polygon(col1, 'MULTIPOLYGON (((-113.492068121648 53.55784419845, -113.492503551661 53.557778292305, -113.492467250002 53.557691409088, -113.492031508924 53.557756391816, -113.492068121648 53.55784419845), (-113.536966729027 53.618692548203, -113.537518089256 53.61867322157, -113.537502080295 53.618514703566, -113.536950735933 53.618534011314, -113.536966729027 53.618692548203)))')");
  });
});
