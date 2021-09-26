export default function getByEnv(dev, beta, prod) {
    const REACT_APP_BENFREE_ENV = process.env.REACT_APP_BENFREE_ENV;

    if (REACT_APP_BENFREE_ENV === "prod") {
        return prod
    }
    return beta;
}
