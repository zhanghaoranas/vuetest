export const getAreaList = ({ currentPage }) => {
  const areaList = [];
  for (let i = 0; i < 300; i++) {
    areaList.push({
      areaName: `${currentPage} - 区域${i}`,
      areaId: i,
      id: i,
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
