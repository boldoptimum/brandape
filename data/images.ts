
// This file centralizes all image assets.
// In a real-world scenario, these would be URLs to a CDN.
// For this demo, they are placeholder URLs from an image service.

const imageFromSeed = (seed: string, width: number = 400, height: number = 400) => `https://picsum.photos/seed/${seed}/${width}/${height}`;

export const Images = {
    backgrounds: {
        authBg: imageFromSeed('authBg', 800, 1200),
        joinBg: imageFromSeed('joinBg', 800, 1200),
        heroBg: imageFromSeed('heroBg', 1200, 600),
        saleBg: imageFromSeed('saleBg', 1200, 400),
        deliveryBg: imageFromSeed('deliveryBg', 800, 600),
    },
    users: {
        buyer_01: imageFromSeed('buyer01', 200, 200),
        vendor_01: imageFromSeed('vendor01', 200, 200),
        support_01: imageFromSeed('support01', 200, 200),
        admin_01: imageFromSeed('admin01', 200, 200),
        buyer_02: imageFromSeed('buyer02', 200, 200),
        vendor_02: imageFromSeed('vendor02', 200, 200),
        newUser: imageFromSeed('newUser', 200, 200),
    },
    products: {
        grains: imageFromSeed('grains'),
        grains_2: imageFromSeed('grains2'),
        corn: imageFromSeed('corn'),
        plantains: imageFromSeed('plantains'),
        carrots: imageFromSeed('carrots'),
        beans: imageFromSeed('beans'),
        tomatoes: imageFromSeed('tomatoes'),
        onions: imageFromSeed('onions'),
        yams: imageFromSeed('yams'),
        peppers: imageFromSeed('peppers'),
        palmoil: imageFromSeed('palmoil'),
    }
}
