import { popular } from './_mockData';

export async function get({ query }) {
    const value = query.get('value');
    if (value === 'popular') {
        return {
            status: 200,
            body: popular
        };
    }
    return {
        status: 404,
        body: {
            message: 'Not found'
        }
    };
}