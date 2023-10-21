export const loadDataForRegion = async (region) => {
    console.log(region)
    try {
        const module = await import(`../../public/data/bio_data_${region}.json`);
        return module.default;
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        return null;
    }
};
