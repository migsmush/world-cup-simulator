export const fetchRankingOverview = async (dateId: string) => {
    try {
        const res = await fetch('http://localhost:3000/api/ranking-overview')
        const data = res.json();
        console.log(data);
    } catch (e) {
        console.error('error occurred while fetching ranking overview: ', e)
    }
};
