import { NextResponse } from 'next/server';
import { errorHandler } from '@/helper/api/error-handler';

export async function POST(req) {
  try {
    const body = await req.json();
    const { TranDtls, DocDtls, SellerDtls, BuyerDtls, authToken } = body;

    // Validate authentication token (in a real implementation)
    if (!authToken) {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Authentication token required' 
        },
        { status: 401 }
      );
    }

    // Validate TranDtls
    if (!TranDtls || typeof TranDtls !== 'object') {
      return NextResponse.json(
        { 
          status: false, 
          message: 'TranDtls (Transaction Details) are required' 
        },
        { status: 400 }
      );
    }

    const { TaxSch, SupTyp, RegRev, EcmGstin, IgstOnIntra } = TranDtls;

    // Validate required TranDtls fields
    if (!TaxSch || !SupTyp) {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Tax Scheme (TaxSch) and Supply Type (SupTyp) are required' 
        },
        { status: 400 }
      );
    }

    // Validate SupTyp
    const validSupplyTypes = ['B2B', 'SEZWP', 'SEZWOP', 'EXPWP', 'EXPWOP', 'DEXP'];
    if (!validSupplyTypes.includes(SupTyp)) {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Invalid Supply Type. Must be one of: B2B, SEZWP, SEZWOP, EXPWP, EXPWOP, DEXP' 
        },
        { status: 400 }
      );
    }

    // Validate DocDtls
    if (!DocDtls || typeof DocDtls !== 'object') {
      return NextResponse.json(
        { 
          status: false, 
          message: 'DocDtls (Document Details) are required' 
        },
        { status: 400 }
      );
    }

    const { Typ, No, Dt } = DocDtls;

    // Validate required DocDtls fields
    if (!Typ || !No || !Dt) {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Document Type (Typ), Number (No), and Date (Dt) are required' 
        },
        { status: 400 }
      );
    }

    // Validate document type
    const validTypes = ['INV', 'CRN', 'DBN'];
    if (!validTypes.includes(Typ)) {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Invalid document type. Must be INV, CRN, or DBN' 
        },
        { status: 400 }
      );
    }

    // Validate date format (DD/MM/YYYY)
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(Dt)) {
      return NextResponse.json(
        { 
          status: false, 
          message: 'Invalid date format. Use DD/MM/YYYY' 
        },
        { status: 400 }
      );
    }

    // Validate SellerDtls (optional but recommended)
    if (SellerDtls && typeof SellerDtls === 'object') {
      const { Gstin, LglNm } = SellerDtls;
      if (Gstin && !(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(Gstin))) {
        return NextResponse.json(
          { 
            status: false, 
            message: 'Invalid Seller GSTIN format' 
          },
          { status: 400 }
        );
      }
    }

    // Validate BuyerDtls (optional but recommended)
    if (BuyerDtls && typeof BuyerDtls === 'object') {
      const { Gstin, Pos } = BuyerDtls;
      if (Gstin && !(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(Gstin))) {
        return NextResponse.json(
          { 
            status: false, 
            message: 'Invalid Buyer GSTIN format' 
          },
          { status: 400 }
        );
      }
      if (Pos && !(/^[0-9]{2}$/.test(Pos))) {
        return NextResponse.json(
          { 
            status: false, 
            message: 'Invalid Place of Supply (Pos) format. Should be 2-digit state code' 
          },
          { status: 400 }
        );
      }
    }

    // Generate a mock IRN (Invoice Reference Number)
    const generateIRN = () => {
      const timestamp = Date.now().toString();
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `01AMBPG1234A1Z5-${Typ}-${No}-${timestamp.slice(-6)}${random}`;
    };

    // For demo purposes, create a mock E-Invoice response
    const mockEInvoice = {
      id: `einv_${Date.now()}`,
      irn: generateIRN(),
      tranDtls: TranDtls,
      docDtls: DocDtls,
      sellerDtls: SellerDtls,
      buyerDtls: BuyerDtls,
      status: 'Generated',
      generatedDate: new Date().toISOString(),
      qrCode: `mock_qr_code_${No}`,
      ackNo: `ACK${Date.now()}`,
      ackDt: new Date().toISOString()
    };

    // TODO: Implement actual GST Portal E-Invoice API integration here
    // This would involve:
    // 1. Authenticating with GST Portal
    // 2. Sending the complete E-Invoice JSON payload with TranDtls, DocDtls, SellerDtls, and BuyerDtls
    // 3. Getting IRN and QR code from the response
    
    console.log('Creating E-Invoice with payload:', {
      TranDtls,
      DocDtls,
      SellerDtls,
      BuyerDtls,
      mockEInvoice
    });

    return NextResponse.json({
      status: true,
      message: 'E-Invoice created successfully',
      data: {
        invoice: mockEInvoice,
        irn: mockEInvoice.irn,
        ackNo: mockEInvoice.ackNo,
        ackDt: mockEInvoice.ackDt,
        qrCode: mockEInvoice.qrCode
      }
    });

  } catch (error) {
    console.error('E-Invoice creation error:', error);
    return errorHandler(error, req);
  }
}
