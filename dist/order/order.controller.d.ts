import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    all(page: 1): Promise<import("../common/paginated-result.interface").PaginatedResult>;
}
