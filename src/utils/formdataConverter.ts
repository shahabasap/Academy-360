export default function convertToFormData(data: any, formData = new FormData(), parentKey = ''): FormData {
    if (data && typeof data === 'object' && !(data instanceof File)) {
        Object.keys(data).forEach(key => {
            const value = data[key];
            const fullKey = parentKey ? `${parentKey}[${key}]` : key;

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    convertToFormData(item, formData, `${fullKey}[${index}]`);
                });
            } else if (value && typeof value === 'object' && !(value instanceof File)) {
                convertToFormData(value, formData, fullKey);
            } else {
                formData.append(fullKey, value);
            }
        });
    } else {
        formData.append(parentKey, data);
    }
    return formData;
}
