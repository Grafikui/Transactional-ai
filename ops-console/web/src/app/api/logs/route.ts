import { NextResponse } from "next/server";
import { prisma } from "../prisma";

export async function GET() {
  try {
    const logs = await prisma.log.findMany();
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logs', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const log = await prisma.log.create({ data });
    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create log', details: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    if (!data.id) {
      return NextResponse.json({ error: 'Missing log id' }, { status: 400 });
    }
    const log = await prisma.log.update({
      where: { id: data.id },
      data,
    });
    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update log', details: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing log id' }, { status: 400 });
    }
    await prisma.log.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete log', details: String(error) }, { status: 500 });
  }
}
