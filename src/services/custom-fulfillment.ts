import {
  AbstractFulfillmentService,
  Cart,
  Fulfillment,
  LineItem,
  Order,
} from "@medusajs/medusa";
import { CreateReturnType } from "@medusajs/medusa/dist/types/fulfillment-provider";

class FulfillmentService extends AbstractFulfillmentService {
  static identifier = "custom-fulfillment";
  protected readonly options_;

  constructor(container, options) {
    super(container);
    this.options_ = options;
  }

  // This method is used when retrieving the list of fulfillment options available in a region
  // Each of these options can have different data associated with them.
  // These methods appears in medusa admin -> regions -> select fulfillment provider
  async getFulfillmentOptions(): Promise<any[]> {
    return [
      {
        id: "custom-fulfillment",
      },
    ];
  }

  // Method is called when a shipping method is created.
  // To validate the selected shipping method from admin panel
  async validateOption(data: Record<string, unknown>): Promise<boolean> {
    return data.id == "custom-fulfillment";
  }

  // This method is called when a shipping method is created. This typically happens when the customer chooses a shipping option during checkout.
  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Cart
  ): Promise<Record<string, unknown>> {
    if (data.id !== "custom-fulfillment") {
      throw new Error("invalid data");
    }

    return {
      ...data,
    };
  }

  // This method is used when a fulfillment is created for an order.
  async createFulfillment(
    data: Record<string, unknown>,
    items: LineItem[],
    order: Order,
    fulfillment: Fulfillment
  ) {
    // No data is being sent anywhere
    // No data to be stored in the fulfillment's data object
    return {};
  }

  // This method is called when a fulfillment is cancelled by the admin. This fulfillment can be for an order
  async cancelFulfillment(fulfillment: Record<string, unknown>): Promise<any> {
    return {};
  }

  // This method is used in different places, including:
  // When the shipping options for a cart are retrieved during checkout. If a shipping option has their price_type set to calculated, this method is used to set the amount of the returned shipping option.
  // When a shipping method is created. If the shipping option associated with the method has their price_type set to calculated, this method is used to set the price attribute of the shipping method in the database.
  // When the cart's totals are calculated.
  async calculatePrice(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Cart
  ): Promise<number> {
    return cart.items.length * 1000;
  }

  // Used to determine whether a shipping option is calculated dynamically or flat rate.
  async canCalculate(data: Record<string, unknown>): Promise<boolean> {
    return data.id === "custom-fulfillment-dynamic";
  }

  async createReturn(
    returnOrder: CreateReturnType
  ): Promise<Record<string, unknown>> {
    return {};
  }

  // This methods used to retrieve any documents associated with a fulfillment.
  // This method isn't used by default in the backend, but you can use it for
  // custom use cases such as allowing admins to download these documents.

  getFulfillmentDocuments(data: { [x: string]: unknown }): Promise<any> {
    throw new Error("Method not implemented.getFulfillmentDocuments");
  }
  getReturnDocuments(data: Record<string, unknown>): Promise<any> {
    throw new Error("Method not implemented.getReturnDocuments");
  }
  getShipmentDocuments(data: Record<string, unknown>): Promise<any> {
    throw new Error("Method not implemented.getShipmentDocuments");
  }
  retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: "invoice" | "label"
  ): Promise<any> {
    throw new Error("Method not implemented.retrieveDocuments");
  }

}

export default FulfillmentService;
