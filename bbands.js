function bbands(values, nPeriod = 20, kTimes = 2) {
    // note: output array of each band will be shorter than input values by nPeriod
    // if input values are indexed from day 1 to day 100, with nPeriod==20, the output index is 20 to 100
    var smaValues = sma(values, nPeriod);
    var upperBand = [];
    var lowerBand = [];

    var lastStartingIndex = values.length - nPeriod;
    for (var i=0; i<lastStartingIndex; i++) {
        var nValues = values.slice(i, nPeriod+i);
        var stdDevTimesK = standardDeviation(nValues)*kTimes;
        upperBand.push(smaValues[i] + stdDevTimesK);
        lowerBand.push(smaValues[i] - stdDevTimesK);
    }
    
    return { upperBand, lowerBand };
}

function standardDeviation(values) {
    var mean = average(values);
    var len = values.length;
    var squaredDiffFromMeanValues = [];

    for (var i=0; i<len; i++) {
        var diffFromMean = values[i] - mean;
        var squaredDiffFromMean = diffFromMean * diffFromMean;
        squaredDiffFromMeanValues.push(squaredDiffFromMean);
    }

    var variance = average(squaredDiffFromMeanValues);
    var stdDev = Math.sqrt(variance);

    return stdDev;
}

function average(values) {
    var sum = 0;
    var count = values.length;
    for (var i=0; i<count; i++) {
        sum += values[i];
    }
    return (sum / count);
}

function sma(values, n) {
    var result = [];
    var avg;
    var sliced;
    var j;
    var count = values.length;
    for (var i=0; i<(count-n); i++) {
        j = i+n;
        sliced = values.slice(i, j);
        avg = average(sliced);
        result.push(avg);
    }
    return result;
}

var rawValues = [1563.58, 1571.05, 1571.48, 1564.08, 1572.1, 1572.93, 1568.84, 1575.24, 1571.8, 1566.84, 1560.83, 1554.88, 1562.99, 1570.79, 1578.82, 1584.29, 1591, 1590.8, 1590.56, 1577.31, 1576.32, 1572.67, 1582.95, 1589.13, 1582.52, 1589.29, 1583.25, 1585.24, 1572.24, 1573.37, 1576.05, 1577.84, 1578.47, 1564.42, 1572.04, 1567.32, 1564.59, 1558.03, 1559.56, 1567.19, 1569.94, 1566.2, 1553.61, 1549.87, 1551.73, 1549.24, 1539.91, 1535.51, 1543.15, 1540.8, 1557.05, 1560.98, 1563.54, 1568.78, 1566.66, 1568.72, 1573.51, 1570.5, 1576.72, 1574.97, 1579.88, 1575.11, 1580.86, 1583.82, 1582.12, 1583.53, 1581.19, 1582.78, 1589.5, 1575.91, 1574.42, 1567.19, 1566.28, 1570.02, 1564.66, 1562.27, 1567.47, 1566.77, 1566.32, 1564.12, 1564.12, 1573.05, 1569.02, 1568.02, 1560.31, 1550.27, 1543.94, 1537.42, 1546.35, 1548.29, 1545.88, 1549.64, 1557.73, 1564.69, 1566.15, 1569.41, 1569.27, 1568.17, 1568.57, 1561.66, 1563.11, 1567.6, 1566.85, 1568.95, 1566.58, 1570.28, 1566.65, 1563.81, 1572.36, 1577, 1573.53, 1576.58, 1581.14, 1578.62, 1577.01, 1580.91, 1582.36, 1585.61, 1586.45, 1582.63, 1578.12, 1574.74, 1579.41, 1574.11, 1575.02, 1569.64, 1569.44, 1569.24, 1574.93, 1579.41, 1577.79, 1574.09, 1571.52, 1575.85, 1575.28, 1573.51, 1576.73, 1581.42, 1583.17, 1581.06, 1576.08, 1576.45, 1580.54, 1578.25, 1578.26, 1573.67, 1577.44, 1571.51, 1571.64, 1561.31, 1567.19, 1567.52, 1568.95, 1566.53, 1569.62, 1573.19, 1573.38, 1575.96, 1575.85, 1585.79, 1614.14, 1613.34, 1616.16, 1618.42, 1619.11, 1620.42, 1621.3, 1632.66, 1635.61, 1637.54, 1643.55, 1642.94, 1659.1, 1660.53, 1670.2, 1672.59, 1670.65, 1670.49, 1659.05, 1667.59, 1669.75, 1670.27, 1666.36, 1673.16, 1688.64, 1689.97, 1687.77, 1690.87, 1695.97, 1692.22, 1706.95, 1714.14, 1712.48, 1726.67, 1724.47, 1707.53, 1683.43, 1692.58, 1701.81, 1708.84, 1716.03, 1718.66, 1721.37, 1714.55, 1701.93, 1701.47, 1711.74, 1712.75, 1714.65, 1703.03, 1689.28, 1687.05, 1702.63, 1690.26, 1691.25, 1709.38, 1714.38, 1710.48, 1713.13, 1707.38, 1695.84, 1695.67, 1706.52, 1705.33, 1697.39, 1699.65, 1697.61, 1694.39, 1703.37, 1706.52, 1702.17, 1706.93, 1714.99, 1717.69, 1723.71, 1732.31, 1738.16, 1736.91, 1742.08, 1750.22, 1752.48, 1752.89, 1743.29]

console.time("bbands calculation");
var bbands = bbands(rawValues)
console.timeEnd("bbands calculation");
console.log("BBands", bbands);
