export const getAreaList = () => {
  const areaList = [];
  for (let i = 0; i < 300; i++) {
    areaList.push({
      areaName: `区域${i}`,
      areaId: i,
    });
  }
  return Promise.resolve({
    data: {
      data: {
        total: areaList.length,
        records: areaList,
      },
    },
  });
};
