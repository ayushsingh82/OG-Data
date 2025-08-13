#!/usr/bin/env python3
"""
AgentForge Backend - Main Runner Script

This script provides a unified interface to run both the orchestration and 
autonomous research tracks of the AgentForge project.

Usage:
    python main.py --track orchestration
    python main.py --track autonomous
    python main.py --track both
"""

import argparse
import sys
import os
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.append(str(backend_dir))

def run_orchestration():
    """Run the orchestration track (medical research with federated learning)."""
    print("\n" + "="*60)
    print("🚀 Starting ORCHESTRATION Track")
    print("="*60)
    
    try:
        # First, generate sample data
        from utils.data_provider import generate_medical_data, save_anonymized_data
        print("📊 Generating sample medical data...")
        medical_data = generate_medical_data(1000)
        save_anonymized_data(medical_data, "anonymized_medical_data.csv")
        
        # Then run the orchestrator
        from orchestration.orchestrator import run_decentralized_research
        run_decentralized_research()
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all required packages are installed: pip install -r requirements.txt")
    except Exception as e:
        print(f"❌ Error running orchestration: {e}")

def run_autonomous():
    """Run the autonomous research track (DeFi analysis)."""
    print("\n" + "="*60)
    print("🔍 Starting AUTONOMOUS RESEARCH Track")
    print("="*60)
    
    try:
        from autonomous_research.defi_agent import run_defi_agent
        run_defi_agent()
        
    except ImportError as e:
        print(f"❌ Import error: {e}")
        print("Make sure all required packages are installed: pip install -r requirements.txt")
    except Exception as e:
        print(f"❌ Error running autonomous research: {e}")

def main():
    parser = argparse.ArgumentParser(
        description="AgentForge Backend - AI Agent Orchestration and Autonomous Research",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python main.py --track orchestration    # Run medical research orchestration
  python main.py --track autonomous       # Run DeFi autonomous research
  python main.py --track both             # Run both tracks
        """
    )
    
    parser.add_argument(
        '--track',
        choices=['orchestration', 'autonomous', 'both'],
        default='both',
        help='Which track to run (default: both)'
    )
    
    parser.add_argument(
        '--env-file',
        default='.env',
        help='Path to environment file (default: .env)'
    )
    
    args = parser.parse_args()
    
    # Check if environment file exists
    if not os.path.exists(args.env_file):
        print(f"⚠️  Warning: Environment file '{args.env_file}' not found.")
        print("   Please copy 'env.example' to '.env' and configure your settings.")
        print("   Some features may not work without proper configuration.")
    
    print("🤖 AgentForge Backend")
    print("Decentralized AI Agent Orchestration and Autonomous Research")
    print("-" * 60)
    
    if args.track == 'orchestration':
        run_orchestration()
    elif args.track == 'autonomous':
        run_autonomous()
    elif args.track == 'both':
        run_orchestration()
        run_autonomous()
    
    print("\n" + "="*60)
    print("✅ AgentForge Backend execution complete!")
    print("="*60)

if __name__ == "__main__":
    main() 