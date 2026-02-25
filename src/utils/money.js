export const formatMoney = function formatMoney(amount) {
    return `${amount < 0 ? '-': ''}$${Math.abs((amount) / 100).toFixed(2)}`;
}
