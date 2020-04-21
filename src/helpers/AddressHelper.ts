export default class AddressHelper {
  /** Gets bgio host:port address. */
  public static getServerAddress() {
    return `${window.location.protocol}//${window.location.hostname}:8000`;
  }
}
