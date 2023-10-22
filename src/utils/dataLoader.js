export const loadDataForRegion = async (region) => {
    try {
        const module = await import(`../../public/data/bio_data_${region}.json`);
        return module.default;
    } catch (error) {
        return null;
    }
};
